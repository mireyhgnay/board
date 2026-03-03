// lib/utils/format.ts
// --------------------
// 날짜 등 공통 포맷 유틸 함수 모음

/**
 * ISO 8601 날짜 문자열을 한국어 형식으로 변환
 * 예: "2024-01-15T09:30:00Z" → "2024. 1. 15."
 */
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("ko-KR");
}

/**
 * ISO 8601 날짜 문자열을 날짜+시간 형식으로 변환
 * 예: "2024-01-15T09:30:00Z" → "2024. 1. 15. 오전 9:30"
 */
export function formatDateTime(isoString: string): string {
  return new Date(isoString).toLocaleString("ko-KR");
}
