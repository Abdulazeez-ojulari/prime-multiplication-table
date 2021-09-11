
import './App.css';
import React, { Component } from 'react';

class App extends Component{

  constructor(){
    super();

    this.state = {
      table: [],
      row: [],
      result: false,
      rowVal: '',
      colVal: ''
    }
  }

  // componentDidMount(){
  //   this.multiplication()
  // }

  getPrime(num){
    let primes = Array.from({ length: num - 1 }).map((m, n) => n + 2),
      sqroot = Math.floor(Math.sqrt(num)),
      numsTillSqroot = Array.from({ length: sqroot - 1 }).map((m, n) => n + 2);
    
    numsTillSqroot.forEach(m => (primes = primes.filter(n => n % m !== 0 || n === m)));

    return primes;
  }

  // getPrime(num){
  //   let primes = [];
  //   for (let i = num; i >= 0; i--) {
  //     let flag = 0;
  
  //     // looping through 2 to user input number
  //     for (let j = 2; j < i; j++) {
  //         if (i % j === 0) {
  //             flag = 1;
  //             break;
  //         }
  //     }
  //     // if number greater than 1 and not divisible by other numbers
  //     if (i > 1 && flag === 0) {
  //         primes.unshift(i);
  //     }
  //   }
  //   return primes;
  // }

  handleCol = (e) => {
    let col = e.target.value;
    this.setState({
      colVal: col
    })
  }

  handleRow = (e) => {
    let row = e.target.value;
    this.setState({
      rowVal: row
    })
  }

  multiplication = () => {
    let rowVal = this.state.rowVal;
    let colVal = this.state.colVal;

    if( rowVal === '' || !rowVal.match(/^[0-9 .]*$/)){
      rowVal = '10'
    }

    if( colVal === '' || !colVal.match(/^[0-9 .]*$/)){
      colVal = '10'
    }

    let row = this.getPrime(parseInt(rowVal));
    let col = this.getPrime(parseInt(colVal));
    let grid = [];

    for(let i=0; i<col.length; i++){
      let arr = []
      for(let j=0; j<row.length; j++){
        arr.push(col[i] * row[j])
      }
      arr.unshift(col[i])
      grid.push(arr);
    }

    this.setState({
      table: grid,
      row: row,
      result: true
    });

    
    // grid.forEach(c => {c.map(e => console.log(e)) ;});
  }
  


  render(){
    const { table, row, result } = this.state;

    const grid = table.map(c => { 
      return (
        <tr key={c}>
          {
            c.map(e => {
              return (
                <td data-testid='primes' key={e}>{e}</td>
              )
            })
          }
        </tr>
      ) 
    })

    const tableH = row.map(c => {
      return(
        <th key={c}>{c}</th>
      )
    })
    return(

    <React.Fragment>
      <div className='form-container'>
        <div className='form'>
          <div className='form-group'>
            <label htmlFor='row' className='form-label'>Row</label>
            <input id='row' name ='row' onChange={this.handleRow} className='form-input' placeholder='Enter first number' />
          </div>
          <div className='form-group'>
            <label htmlFor='col' className='form-label'>Col</label>
            <input id='col' name='col' onChange={this.handleCol} className='form-input' placeholder='Enter second number' />
          </div>
          <button onClick={this.multiplication} className='btn'>Generate</button>
        </div>
      </div>
      { result && 
      <div className="transactions">
    
        <table className="table table-striped mb-0 table-hover">
            <thead>
                <tr>
                    <th></th>
                    { tableH }
                </tr>
            </thead>
            <tbody>
              { grid }
            </tbody>
        </table>
        
      </div>
      }
    </React.Fragment>
    )
  }
}

export default App;
