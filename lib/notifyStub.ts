export type PressEvent = {
  id: string
  en: string
  gu: string
  timestamp: number
}

// Placeholder for future device notifications (e.g., Web Push, WebSocket)
export async function sendNotificationStub(event: PressEvent): Promise<void> {
  // Intentionally a no-op for MVP
  void event
}



