function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [data, setData] = React.useState('');

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>

    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  
//  const [data, setData] = React.useState('');

  const user = email;

  function handle(){
  
    console.log('email ' + email);
    const url = `/account/findOne/${email}`;
    console.log('url' + url);

    fetch(`/account/findOne/${email}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.balance);
        props.setShow(false);
        props.setStatus(data.email + ' balance is ' + data.balance);
        //props.setData(JSON.stringify(data));
    });

    //setBalance(user.balance);
    console.log(user);
    //props.setStatus('Your balance is: ' + user.balance);
    //props.setStatus('Your balance is: ' + data);
    props.setShow(false);

    /*return (
      <>
      "data" + {data}
      </>
    );*/


    /*if (!user) {
      props.setStatus('fail!')      
      return;      
    }*/




   /* let databody = {
      "name": this.state.name,
      "balance": this.state.balance
    }

  return fetch(url, {
      method: 'POST',
      body: JSON.stringify(databody),
      headers: {
          'Content-Type': 'application/json'
      },
  })
  .then(res => res.json())
  .then(data => console.log(data));*/

  }

  return (<>
  
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}