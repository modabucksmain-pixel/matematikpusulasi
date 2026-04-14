# Skills Reference - Matematik Pusulası

> Kaydedilme tarihi: 2026-04-13
> 5 skill birleştirilmiş referans dosyası

---

## 1. ANTIGRAVITY-SKILL-ORCHESTRATOR

**Kategori:** meta | **Risk:** safe | **Kaynak:** community

### Özet
Meta-skill: karmaşık görevlerde uygun skill kombinasyonlarını seçer, basit görevlerde skill kullanımını engeller. `agent-memory-mcp` ile başarılı kombinasyonları takip eder.

### Ne Zaman Kullanılır
- Çoklu domain uzmanlığı gerektiren karmaşık, çok adımlı problemler
- Hangi skill'in uygun olduğunu keşfetmek gerektiğinde
- "orchestrate", "combine skills" talep edildiğinde

### Temel Kavramlar

#### Görev Değerlendirme Korkulukları
Basit görevlerde (CSS fix, değişken yeniden adlandırma) skill kullanma. Orchestrator yeni skill OLUŞTURAMAZ.

Değerlendirme:
1. Görev basit/bağımsız mı? → Doğrudan çöz
2. Görev karmaşık/çoklu-domain mı? → Skill orkestre et

#### Skill Seçimi & Kombinasyonlar
Karmaşık görevde gerekli domain'leri belirle (frontend, DB, deployment). Yerel skill'ler yetersizse master kataloğa danış.

#### Master Skill Kataloğu
URL: `https://raw.githubusercontent.com/sickn33/antigravity-awesome-skills/main/CATALOG.md`
9 kategori: architecture, business, data-ai, development, general, infrastructure, security, testing, workflow

#### Memory Entegrasyonu
`agent-memory-mcp` ile başarılı skill kombinasyonları kaydedilir/sorgulanır.

### Adım Adım

1. **Görev Değerlendirme** → Basit dosya düzenleme ile çözülebilir mi?
2. **Geçmiş Bilgi Sorgulama** → `memory_search({ query: "...", type: "skill_combination" })`
3. **Skill Keşfi & Seçimi** → Yerel skill listesi → Master katalog → Minimal set seç
4. **Uygula & Kombinasyonu Kaydet** → `memory_write({ key: "...", type: "skill_combination", ... })`

### Örnek: Basit Görev
> "index.css'de buton rengini maviye çevir" → Skill KULLANMA, doğrudan düzenle

### Kurallar
- ✅ Skill aramadan önce karmaşıklık değerlendir
- ✅ Orkestre edilmiş skill sayısını minimal tut
- ❌ Basit bug fix'ler için kullanma
- ❌ Çakışan talimatları olan skill'leri çakıştırma
- ❌ Yeni skill oluşturmaya çalışma

---

## 2. CAVEMAN

**Kategori:** iletişim | **Risk:** safe | **Kaynak:** community

### Özet
Ultra-sıkıştırılmış iletişim modu. Token kullanımını ~%75 azaltır. Teknik doğruluk korunur.

### Mod: `/caveman lite|full|ultra`

**Varsayılan:** full

### Kurallar
Sil: article'lar (a/an/the), dolgu (just/really/basically), nezaket (sure/certainly), kayıtlanma sözleri. Kısa eşanlamlılar kullan. Teknik terimler aynen kalsın. Kod blokları değişmez.

Kalıp: `[şey] [eylem] [neden]. [sonraki adım].`

### Yoğunluk Seviyeleri

| Seviye | Değişen |
|--------|---------|
| **lite** | Dolgu/kayıtlanma yok. Article + tam cümleler kalır. Profesyonel ama sıkı |
| **full** | Article'ları sil, fragman OK, kısa eşanlamlılar. Klasik caveman |
| **ultra** | Kısalt (DB/auth/config/req/res/fn/impl), bağlaçları sil, nedensellik için ok (X → Y), tek kelime yeterliyse tek kelime |

### Otomatik Netlik
Güvenlik uyarıları, geri dönüşü olmayan eylem onayları, kullanıcı kafası karışık → caveman modunu bırak.

### Sınırlar
Kod/commit/PR: normal yaz. "stop caveman" veya "normal mode": geri dön.

---

## 3. UI-UX-DESIGNER

**Kategori:** tasarım | **Risk:** unknown | **Kaynak:** community

### Özet
Kullanıcı merkezli tasarım, modern tasarım sistemleri ve erişilebilir arayüz oluşturma uzmanı.

### Ne Zaman Kullanılır
- UI/UX tasarım görevleri veya iş akışları
- Tasarım için rehberlik, en iyi uygulamalar veya kontrol listeleri

### Yetenekler

#### Tasarım Sistemleri
- Atomik tasarım metodolojisi, token tabanlı mimari
- Figma Variables, Style Dictionary ile token yönetimi
- Bileşen kütüphanesi tasarımı, çapraz platform adaptasyonu
- Tasarım-geliştirme teslim optimizasyonu

#### Kullanıcı Araştırması & Analiz
- Nicel/nitel araştırma metodolojileri
- Kullanılabilirlik testi, A/B testi, yolculuk haritalama
- Persona geliştirme, kart sıralama, bilgi mimarisi doğrulama

#### Erişilebilirlik & Kapsayıcı Tasarım
- WCAG 2.1/2.2 AA ve AAA uyumluluğu
- Renk kontrast analizi, ekran okuyucu optimizasyonu
- Klavye navigasyonu, bilişsel erişilebilirlik

#### Görsel Tasarım & Marka Sistemleri
- Tipografi sistemleri, renk teorisi, ızgara sistemi
- İkonografi, marka kimliği, görsel hiyerarşi
- Duyarlı tasarım ilkeleri

#### Etkileşim Tasarımı
- Mikro-etkileşim tasarımı, animasyon ilkeleri
- Durum yönetimi, hata durumları, yükleme durumları
- Jest tasarımı, ses UI'ı, AR/VR arayüz

#### Çapraz Platform
- Duyarlı web, mobil-ilk yaklaşımlar
- iOS HIG, Material Design, PWA
- Masaüstü, giyilebilir, akıllı TV

### Yaklaşım
1. Kullanıcı ihtiyaçlarını araştır
2. Token ve yeniden kullanılabilir bileşenlerle sistematik tasarla
3. Erişilebilirliği kavram aşamasından önceliklendir
4. Tasarım kararlarını belgele
5. Geliştiricilerle işbirliği yap
6. Test et ve yinele
7. Tutarlılığı koru
8. Tasarım etkisini ölç

---

## 4. WRITING-SKILLS

**Kategori:** meta | **Risk:** unknown | **Kaynak:** community

### Özet
Skill oluşturma mükemmelliği için dağıtıcı. Karar ağacı ile doğru şablon ve standartları bul.

### Karar Ağacı

**YENİ Skill Oluştur:**
- Basit (tek dosya, <200 satır) → Tier 1 Mimari
- Karmaşık (çoklu konsept, 200-1000 satır) → Tier 2 Mimari
- Devasa platform (10+ ürün) → Tier 3 Mimari

**MEVCUT Skill İyileştir:**
- "Çok uzun" → Modülerleştir (Tier 3)
- "AI kuralları yok sayıyor" → Anti-Rasyonalizasyon
- "Kullanıcılar bulamıyor" → CSO (Arama Optimizasyonu)

**Uyumluluk Doğrula:**
- Metadata/isimlendirme kontrol → Standartlar
- Test ekle → Test Rehberi

### Bileşen İndeksi

| Bileşen | Amaç |
|---------|------|
| CSO | "LLM'ler için SEO". Tetikleyen açıklamalar yazma |
| Standartlar | Dosya adlandırma, YAML frontmatter, dizin yapısı |
| Anti-Rasyonalizasyon | Agent'ların yok saymayacağı kurallar yazma |
| Test | Skill'in gerçekten çalıştığından emin olma |

### Şablonlar
- Teknik Skill (How-to)
- Referans Skill (Docs)
- Disiplin Skill (Rules)
- Desen Skill (Design Patterns)

### İş Akışı
1. Hedefi belirle → Karar ağacı
2. Şablon seç → `references/templates/`
3. CSO uygula → Keşfedilebilirlik optimizasyonu
4. Anti-rasyonalizasyon ekle → Disiplin skill'leri için
5. Test et → RED-GREEN-REFACTOR

### Dağıtım Öncesi Kontrol Listesi
- [ ] `name` alanı dizin adıyla eşleşiyor
- [ ] `SKILL.md` dosya adı BÜYÜK HARF
- [ ] Açıklama "Use when..." ile başlıyor
- [ ] `metadata.triggers` 3+ anahtar kelime
- [ ] Toplam satır < 500
- [ ] Cross-reference'larda `@` force-loading yok
- [ ] Gerçek senaryolarla test edildi

### Yaygın Hatalar

| Hata | Düzeltme |
|------|----------|
| Açıklama iş akışını özetliyor | Sadece "Use when..." tetikleyicileri kullan |
| `metadata.triggers` yok | 3+ anahtar kelime ekle |
| Genel isim ("helper") | Gerund kullan (`creating-skills`) |
| Uzun monolitik SKILL.md | `references/` içine böl |

---

## 5. PLAN-WRITING

**Kategori:** workflow | **Risk:** unknown | **Kaynak:** community

### Özet
İşi net, eyleme dönüştürülebilir görevlere doğrulama kriterleriyle bölme çerçevesi.

### Görev Bölme İlkeleri

1. **Küçük, Odaklı Görevler** → 2-5 dk, tek sonuç, bağımsız doğrulanabilir
2. **Net Doğrulama** → Nasıl bitiyor? Ne kontrol edilir? Beklenen çıktı?
3. **Mantıksal Sıralama** → Bağımlılıklar, paralel iş, kritik yol, Doğrulama EN SON
4. **Dinamik İsimlendirme** → `{task-slug}.md` proje kökünde, ASLA `.claude/` veya `docs/` içinde değil

### Planlama İlkeleri

#### İlke 1: KISA Tut
- Maks 5-10 net görev
- Sadece eyleme dönüştürülebilir öğeler
- Plan 1 sayfadan uzunsa → basitleştir

#### İlke 2: SOMUT Ol
| ❌ Yanlış | ✅ Doğru |
|----------|----------|
| "Proje kur" | "`npx create-next-app` çalıştır" |
| "Kimlik doğrulama ekle" | "next-auth yükle, `/api/auth/[...nextauth].ts` oluştur" |
| "UI'yı stillendir" | "`Header.tsx`'e Tailwind class'ları ekle" |

#### İlke 3: Proje Tipine Göre Dinamik İçerik
- **YENİ PROJE:** Tech stack? MVP? Dosya yapısı?
- **ÖZELLİK EKLEMESİ:** Etkilenen dosyalar? Bağımlılıklar? Doğrulama?
- **BUG FIX:** Kök neden? Dosya/satır? Test?

#### İlke 4: Script'ler Projeye Özgü
Tüm script'leri her plana ekleme. Sadece BU görevle ilgili olanları kullan.

#### İlke 5: Doğrulama Basit
| ❌ Yanlış | ✅ Doğru |
|----------|----------|
| "Bileşenin doğru çalıştığını doğrula" | "`npm run dev` çalıştır, butona tıkla, toast gör" |
| "API'yı test et" | "curl localhost:3000/api/users → 200 döner" |

### Plan Yapısı

```
# [Görev Adı]

## Hedef
Tek cümle: Ne inşa ediyoruz/düzeltiyoruz?

## Görevler
- [ ] Görev 1: [Somut eylem] → Doğrulama: [Nasıl kontrol]
- [ ] Görev 2: [Somut eylem] → Doğrulama: [Nasıl kontrol]

## Tamamlandığında
- [ ] [Ana başarı kriteri]
```

### En İyi Uygulamalar
1. Hedefle başla
2. Maks 10 görev
3. Her görev doğrulanabilir
4. Projeye özgü
5. İlerledikçe güncelle → `[x]`

---

> Bu dosya otomatik oluşturulmuştur. 5 Antigravity skill'inin birleştirilmiş Türkçe referansıdır.
