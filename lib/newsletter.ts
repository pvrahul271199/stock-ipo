import { sql } from '@vercel/postgres';

export async function subscribeToNewsletter(email: string) {
  try {
    await sql`
      INSERT INTO newsletter_subscribers (email, subscribed_at)
      VALUES (${email}, NOW())
      ON CONFLICT (email) DO NOTHING
    `;
    return { success: true };
  } catch (error) {
    console.error('Failed to subscribe to newsletter:', error);
    throw new Error('Failed to subscribe to newsletter');
  }
}