import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import "./index.css";



const FunctionComponent = ({ onClick }) => {
  console.log("render")
  const [messages, setMessages] = useState(["Жди ответа бота"])

  useEffect(() => {
    console.log("bot Effect")
    const TEXT = "Привет, я бот"
    const lastMessages = messages[messages.length - 1]
    let timerId = null

    if(lastMessages !== TEXT) {
      timerId = setTimeout(() => {
        setMessages([...messages, TEXT])
      }, 1500)
    }

    return () => {
      console.log("componentWillUnmount")
      clearInterval(timerId)
    }
  }, [messages])

  useEffect(() => {
    const listener = () => {
      console.log("click")
    }

    console.log("useEffect 2")
    document.addEventListener("click", listener)

    return () => {
      console.log("componentWillUnmount")
      document.removeEventListener("click", listener)
    }
  }, [])

  const sendMessages = (message) => {
    setMessages([...messages, message])
  }



  return (
    <div className='window'>
      <h1 className='head'>Отправка сообщений</h1>
      <div className='positionInput'>
      <input className='input'></input>
      </div>
      <div className='positionButton'>
      <button className='button' onClick={ () => sendMessages("Ответ:")}>Отправиь сообщение</button>
      </div>
      <p className='bot_text'>{ messages.map(m => <h1>{m}</h1>) }</p>
    </div>
  );
};


const App = () => {
  const state = {}
  return (
    <>
    <FunctionComponent />
    </>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



/*
import React, {useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef} from 'react';
import ReactDOM from 'react-dom';
//import { App } from './App';


import "./index.css";



const FunctionComponent = ({ onClick }) => {
  console.log("render")
  const [count, setCount] = useState(0)
  const [films, setFilms] = useState(["films 1"])
  const [messages, setMessages] = useState(["message 1"])

  const cb = useCallback (() => {
    console.log("click")
  }, [])

  const result = useMemo (() => {
    return 1 + 1
  }, [])

//bot
  useEffect(() => {
    console.log("bot Effect")
    const TEXT = "hello from bot"
    const lastMessages = messages[messages.length - 1]
    let timerId = null

    if(lastMessages !== TEXT) {
      timerId = setTimeout(() => {
        setMessages([...messages, TEXT])
      }, 500)
    }

    return () => {
      console.log("componentWillUnmount")
      clearInterval(timerId)
    }
    //if(lastMessages !== TEXT) {
      //setMessages([...messages, TEXT])
    //}
  }, [messages])

  useEffect(() => {
    console.log("useEffect 1")
  }, [])


  useEffect(() => {
    const listener = () => {
      console.log("click")
    }

    console.log("useEffect 2")
    document.addEventListener("click", listener)

    return () => {
      console.log("componentWillUnmount")
      document.removeEventListener("click", listener)
    }
  }, [])

  useEffect(() => {
    console.log("useLayoutEffect")
  }, [])
  
  const increment = () => {
    setCount(c => c + 1)
  } 

  const addFilm = () => {
    setFilms([...films, "new film"])
  }

  const removeFilm = (name) => {
    setFilms(films.filter(film => film !== name))
  }

  const sendMessages = (message) => {
    setMessages([...messages, message])
  }



  return (
    <div>
      <h1>FunctionComponent</h1>
      <h2>count {count}</h2>
      <button onClick={ () => sendMessages("test")}>sendMessages</button>
      <h2>{ messages.map(m => <h1>{m}</h1>) }</h2>
      <button onClick={increment}>increment</button>
    </div>
  );
};


class ClassComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0,
      firstName: "firstName",
      lastName: "lastName",
      films: ["film 1", "film 2"],
      tree: {
        prev: "three prev",
        child: {
          current: null,
          prev: "child prev",
        },
        parent: null
      },
    }
  }


  increment = () => {
    this.setState((state) => ({
      count: state.count + 1,
    }))
    this.setState((state) => ({
      count: state.count + 10,
    }))
    this.setState((state) => ({
      count: state.count + 100,
    }))
    //this.setState({
     // count: this.state.count + 1,
     // firstName: 'firstName ${this.state.count}',
     // lastName: 'lastName ${this.state.count}',
    //})
  }

  decrement = () => {
    this.setState({
      count: this.state.count - 1
    })
  }

  addFilm = () => {
    this.setState({
      films: [...this.state.films, new Date().toLocaleString()]
    })
  }
  removeFilm = (name) => {
    this.setState({
      films: this.state.films.filter(film => film !== name)
    })
  }

  updeteCurrent = () => {
    const {tree} = this.state;
    
    this.setState({
      tree: {...tree, child: {...tree.child, current: "new child current"}}
    })
  }


  updeteParent = () => {
    const {tree} = this.state;
    
    this.setState({
      tree: {...tree, parent:"new parent"}
    })
  }

  render() {
    const {onClick} = this.props
    const {count, lastName, firstName, films, tree} = this.state
    console.log("this.state", this.state);

    return (
      <div>
        <h1>ClassComponent</h1>
        <h2>count {count}</h2>
        <h2>firstName {firstName}</h2>
        <h2>lastName {lastName}</h2>
        <button onClick={this.increment}>increment</button>
        <button onClick={this.decrement}>decrement</button>

        <hr/>

        <button onClick={this.addFilm}>add</button>
        {films.map(film => (
          <div>
            <h3>{film}</h3>
            <button onClick={() => this.removeFilm(film)}>x</button>
          </div>
        ))}
        
        
        <hr/>

        <h2>Tree</h2>
        <h2>{JSON.stringify(tree)}</h2>
        <button onClick={this.updeteCurrent}>updeteCurrent</button>
        <button onClick={this.updeteParent}>updeteParent</button>


      </div>
    )
  }
}


const App = () => {
  const state = {}

  return (
    <>
    {<FunctionComponent />}
    {<ClassComponent />}
    </>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

*/