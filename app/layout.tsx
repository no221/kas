import './globals.css'

export const metadata = {
  title: 'Kas Kelas - Sistem Manajemen Uang Kas',
  description: 'Aplikasi untuk mengelola uang kas kelas dengan mudah dan efisien',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
