import { useState,useEffect } from 'react'
import './App.css'

const App =()=>{

  const rowsPage=10;
  const [employees,setEmployees] = useState([])
  const [currentPage,setCurrentPage]= useState(1)

  useEffect(()=>{
    const fetchEmployee= async ()=>{
      try{
        const res= await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        if(!res.ok){
          throw new Error("Network response was not ok")
        }
        const data= await res.json()
        setEmployees(data)
      }catch(e){
        alert("failed to fetch data")
      }
    }
    fetchEmployee()
  }, [])

  const Pages=Math.ceil(employees.length/rowsPage)
  const sIndex=(currentPage-1)*rowsPage
  const eIndex= sIndex+rowsPage
  const currentData= employees.slice(sIndex,eIndex)

  const NextB=()=>{
    if(currentPage<Pages){
      setCurrentPage((prev)=> prev+1)
    }
  }

  const PrevB=()=>{
    if(currentPage>1){
      setCurrentPage((prev)=>prev-1)
    }
  }

  return(
  <div className="container">
      <h1 className="title">Employee Data Table</h1>

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button 
          onClick={PrevB} 
          
          className="nav-btn"
        >
          Previous
        </button>
        
        <button className="page-num-btn">
            {currentPage}
        </button>

        <button 
          onClick={NextB} 
          
          className="nav-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App
