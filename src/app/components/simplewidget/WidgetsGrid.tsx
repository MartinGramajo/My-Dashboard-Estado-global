'use client'
import { useAppSelector } from '@/store'
import { SimpleWidget } from './SimpleWidget'
import { IoCartOutline } from 'react-icons/io5'


const WidgetsGrid = () => {
const {count} = useAppSelector( state => state.counter)

  return (
    <div className="flex flex-wrap p-2 items-center justify-center">
        <SimpleWidget 
          count={count}
          title={`${count}`}
          subtitle="Productos agregados"
          href="./counter"
          icon={<IoCartOutline size={50} className='text-blue-600' />}
        
        /> 
      </div>
  )
}

export default WidgetsGrid
