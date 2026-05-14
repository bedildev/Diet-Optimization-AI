import pandas as pd
import os

# ===============================
# 1. CEK FOLDER
# ===============================
print(os.listdir())
print(os.listdir('data'))

# ===============================
# 2. LOAD DATASET
# ===============================
df1 = pd.read_csv('data/cleaned_nutrition_dataset_per100g.csv')

df2 = pd.read_csv(
    'data/daily_food_nutrition_dataset.csv',
    engine='python',
    on_bad_lines='skip'
)

df3 = pd.read_csv('data/nilai-gizi.csv')

df4 = pd.read_csv('data/fruits.csv')

df5 = pd.read_csv('data/nutrition.csv')

df6 = pd.read_csv(
    'data/NutritionalFacts_Fruit_Vegetables_Seafood.csv',
    encoding='latin1'
)

df7 = pd.read_csv('data/vegetables.csv')

df_harga = pd.read_csv(
    'https://docs.google.com/spreadsheets/d/1RVbvkcGGiCTtCDN81jaorp-NW8gU2KRQFysHyzel-SQ/export?format=csv'
)

df_harga_makanan = pd.read_csv(
    'https://docs.google.com/spreadsheets/d/1y5dPLcIXa09kgPr9alP_cBv74uq4D64b4cTCQgEkvm4/export?format=csv'
)

print("\nData berhasil diload semua!\n")

# ===============================
# 3. LIHAT DATA
# ===============================
print(df1.head())
print(df2.head())
print(df3.head())
print(df_harga.head())
print(df_harga_makanan.head())

# ===============================
# 4. SAMAKAN KOLOM (NORMALISASI)
# ===============================

# df1
df1 = df1.rename(columns={
    'food': 'nama_makanan',
    'Calories (kcal per 100g)': 'kalori',
    'Protein (g per 100g)': 'protein',
    'Fat (g per 100g)': 'lemak',
    'Carbohydrates (g per 100g)': 'karbo'
})

df1 = df1[['nama_makanan', 'kalori', 'protein', 'lemak', 'karbo']]

# df2
df2 = df2.rename(columns={
    'Food_Item': 'nama_makanan',
    'Calories (kcal)': 'kalori',
    'Protein (g)': 'protein',
    'Fat (g)': 'lemak',
    'Carbohydrates (g)': 'karbo'
})

df2 = df2[['nama_makanan', 'kalori', 'protein', 'lemak', 'karbo']]

# df3
df3 = df3.rename(columns={
    'name': 'nama_makanan',
    'energy_kcal': 'kalori',
    'protein_g': 'protein',
    'fat_g': 'lemak',
    'carbohydrate_g': 'karbo'
})

df3 = df3[['nama_makanan', 'kalori', 'protein', 'lemak', 'karbo']]

# df5
df5 = df5.rename(columns={
    'name': 'nama_makanan',
    'calories': 'kalori',
    'proteins': 'protein',
    'fat': 'lemak',
    'carbohydrate': 'karbo'
})

df5 = df5[['nama_makanan', 'kalori', 'protein', 'lemak', 'karbo']]

# df_harga
df_harga = df_harga.rename(columns={
    'Komoditas': 'nama_makanan',
    'Harga': 'harga'
})

df_harga = df_harga[['nama_makanan', 'harga']]
df_harga['harga_rp'] = (
    df_harga['harga']
    .astype(str)
    .str.replace('Rp', '', regex=False)
    .str.replace(',', '', regex=False)
    .str.strip()
)
df_harga['harga'] = pd.NA
df_harga['kalori'] = pd.NA
df_harga['protein'] = pd.NA
df_harga['lemak'] = pd.NA
df_harga['karbo'] = pd.NA
df_harga = df_harga[['nama_makanan', 'kalori', 'protein', 'lemak', 'karbo', 'harga', 'harga_rp']]

# df_harga_makanan
df_harga_makanan = df_harga_makanan[['nama_makanan', 'kalori', 'protein', 'lemak', 'karbo', 'harga_rp']]
df_harga_makanan['karbo'] = df_harga_makanan['karbo'].astype(str).str.replace(';', '', regex=False)
df_harga_makanan['harga'] = pd.NA
df_harga_makanan = df_harga_makanan[['nama_makanan', 'kalori', 'protein', 'lemak', 'karbo', 'harga', 'harga_rp']]

df1['harga'] = pd.NA
df2['harga'] = pd.NA
df3['harga'] = pd.NA
df5['harga'] = pd.NA
df1['harga_rp'] = pd.NA
df2['harga_rp'] = pd.NA
df3['harga_rp'] = pd.NA
df5['harga_rp'] = pd.NA

# ===============================
# 5. GABUNG DATASET (CORE)
# ===============================
df_all = pd.concat([df_harga_makanan, df1, df2, df3, df5, df_harga], ignore_index=True)

# ===============================
# 6. DATA CLEANING
# ===============================
df_all = df_all.drop_duplicates()
df_all = df_all.dropna(subset=['nama_makanan'])

# ===============================
# 7. CEK HASIL AKHIR
# ===============================
print("\nDATA FINAL:")
print(df_all.head())
print("\nShape:", df_all.shape)
print("\nInfo:")
print(df_all.info())

# ===============================
# 8. SIMPAN DATA FINAL
# ===============================
df_all.to_csv('data_final.csv', index=False)

df_all_identik = df_all.copy()
df_all_identik['_nama_makanan_lower'] = df_all_identik['nama_makanan'].astype(str).str.lower()
df_all_identik = df_all_identik.drop_duplicates(subset=['_nama_makanan_lower'], keep='first')
df_all_identik = df_all_identik.drop(columns=['_nama_makanan_lower'])
df_all_identik.to_csv('data_final_identik.csv', index=False)

df_all = df_all[df_all['kalori'] < 1000]

print("\n Dataset final berhasil dibuat: data_final.csv")
print(" Dataset final identik berhasil dibuat: data_final_identik.csv")
