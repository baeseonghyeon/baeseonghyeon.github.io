# 스킬: 포트폴리오 데이터 추가

## 데이터 파일 위치

| 파일 | 내용 |
|------|------|
| `src/data/work.json` | 프로젝트/작업물 목록 |
| `src/data/profile.json` | 자기소개, 연락처, 기술스택 등 |

---

## work.json — 작업물 추가

`data` 배열에 항목을 추가합니다. 배열 순서의 **역순**으로 화면에 표시됩니다 (최신 항목을 배열 끝에 추가).

```json
{
  "title": {
    "ko": "프로젝트 이름",
    "en": "Project Name",
    "jp": "プロジェクト名"
  },
  "info": {
    "date": "2024",
    "category": ["Web"],
    "role": ["Development"],
    "stack": ["React", "TypeScript"],
    "team": null
  },
  "description": {
    "ko": "프로젝트 설명 (한국어)",
    "en": "Project description (English)",
    "jp": "プロジェクト説明（日本語）"
  },
  "link": [
    { "type": "GitHub", "url": "https://github.com/..." },
    { "type": "Website", "url": "https://..." }
  ],
  "thumbUrl": null,
  "image": null,
  "video": null
}
```

### category 허용값 (`WorkCategoryEnums`)
- `"Web"` — 웹 프로젝트
- `"Mobile"` — 모바일 앱

### role 허용값 (`WorkRoleEnums`)
- `"Development"` / `"Planning"` / `"Design"`

### 미디어 첨부

```json
"image": [
  { "url": "https://i.imgur.com/xxxx.jpg", "fullSize": false }
],
"video": [
  { "url": "https://www.youtube.com/embed/VIDEO_ID" }
]
```

- Imgur 이미지 URL은 `convertImgurUrlToDirectLink()` (`src/libs/textParser.ts`)로 자동 변환됨
- `fullSize: true` 설정 시 팝업에서 전체 너비로 표시

---

## profile.json — 프로필 수정

### text (자기소개 텍스트 팝업)

```json
{
  "sort": 1,
  "common": "고유식별자",
  "ko": "한국어 본문",
  "en": "English body",
  "jp": "日本語本文"
}
```

- `sort` 값으로 팝업 표시 순서 결정
- `common`은 팝업 ID 및 CSS 클래스명에 사용됨 (영문 소문자, 하이픈)

### list (기술스택, 연락처 등 목록 팝업)

```json
{
  "title": "skills",
  "sort": 5,
  "listData": [
    {
      "title": { "common": "React" }
    },
    {
      "title": { "ko": "한국어명", "en": "English name", "common": "고유명" },
      "url": "https://...",
      "icon": true
    }
  ]
}
```

- `icon: true` → GitHub/LinkedIn/Velog 아이콘 자동 매핑 (`common` 값 기준)
- `url` 있으면 클릭 시 새 탭으로 이동

---

## 체크리스트

- [ ] ko/en/jp 세 언어 모두 작성
- [ ] `category`, `role` 값이 enum에 정의된 값과 일치하는지 확인
- [ ] 새 팝업이 기존 팝업과 `sort` 번호 충돌하지 않는지 확인
- [ ] `npm run build`로 JSON 파싱 오류 없는지 검증
