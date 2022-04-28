function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }
      }>Logout</button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  var [data, setData] = React.useState('');

  const ctx = React.useContext(UserContext);  

  function handle(){
    //const user = ctx.users.find((user) => user.email == email);
    const url = `/account/findOne/${email}`; 

    (async () => {
      var res = await fetch(url);
      data = await res.json();
      setData(JSON.stringify(data));
      ctx.users.push(data);
      console.log(ctx);
      console.log(ctx.users[ctx.users.length - 1].email);
      props.setStatus('Welcome ' + ctx.users[ctx.users.length - 1].email);
    })();
    props.setShow(false);

    const user = ctx.users[ctx.users.length - 1]; 

    console.log(user);
    console.log(email, password);
    if (!user) {
      console.log('one')      
      props.setStatus('fail!')      
      return;      
    }
    if (user.password == password) {
      console.log('two')            
      props.setStatus('');
      props.setShow(false);
      return;      
    }
    console.log('three')          
    props.setStatus('fail!');        
  }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}