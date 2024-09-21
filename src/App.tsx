import DraggableTable from './components/DraggableTable'
import DraggableList from './components/DraggableList'
import DraggableDivs from './components/DraggableDiv'
import './App.css'

function App() {

  return (
    <div className="container max-w-screen-lg mx-auto p-4">
      <div className='flex flex-col gap-y-8'>
        <div>
          <h1 className="text-2xl font-bold mb-4">Drag-and-Drop Table</h1>
          <DraggableTable />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-4">Drag-and-Drop List</h1>
          <DraggableList />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-4">Drag-and-Drop Div</h1>
          <DraggableDivs />
        </div>
      </div>
    </div>
  )
}

export default App
