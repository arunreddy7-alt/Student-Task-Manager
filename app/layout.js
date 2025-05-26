import './globals.css'

export const metadata = {
  title: 'Student Task Manager',
  description: 'A simple task manager for students',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}