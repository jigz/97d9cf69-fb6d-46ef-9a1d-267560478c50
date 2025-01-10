import Image from 'next/image'
import { Card } from '@repo/ui/card'
import { TrackingsTable } from '@/components/TrackingsTable'

export default function Page(): JSX.Element {
  return (
    <main className='flex flex-col items-center justify-between min-h-screen p-24'>
      <TrackingsTable />
    </main>
  )
}
