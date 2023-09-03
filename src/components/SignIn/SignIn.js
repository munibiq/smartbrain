import React from "react";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) =>{
        this.setState({ signInEmail: event.target.value})
    }
    onPasswordChange = (event) =>{
        this.setState({ signInPassword: event.target.value})
    }
    onSubmitSignIn = () => {
        fetch('https://smapi.cyclic.app/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then( user => {
                if ( user.id ) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
         
    }
    render () {
        const { onRouteChange } = this.props;
        return (
            <article className=" center shadow-4 mw5 mw6-ns hidden ba br2 mv4">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0 center">Smartbrain</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address"  
                            id="email-address"
                            onChange={ this.onEmailChange }/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"  id="password" 
                            onChange={ this.onPasswordChange }/>
                        </div>
                        </fieldset>
                        <div className="">
                            <input
                            onClick={ this.onSubmitSignIn } 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in" />
                        </div>
                        <div className="lh-copy mt3 pointer">
                            <p onClick={ () => onRouteChange('register')} className="f6 link dim black db underline">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
    
}

export default SignIn;