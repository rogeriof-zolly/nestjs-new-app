export interface NotificationDto {
  userId: number,
  types: 'sms' | 'email',
  response: any,
  status: 'SUCCESS' | 'ERROR'
}