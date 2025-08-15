import { Hello } from '@/sources/actions/admin/client.action';
import React from 'react'

export default async function register() {
    const message = await Hello();
  return (
    <div>
      { message.data }
    </div>
  )
}
