import { IonToast, IonItem, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading, IonList, IonLabel, IonCheckbox } from '@ionic/react';
import { useParams } from 'react-router';
import { useHistory, Link } from 'react-router-dom';
import { lockOpen } from 'ionicons/icons';

import './Page.css';
import { useEffect, useState } from 'react';
import { loginUser } from '../firebaseFunctions';
import { setUserState } from '../redux/actions';
import { useDispatch } from 'react-redux';

const Login: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const dispatch = useDispatch()
  const history = useHistory()

  const [busy, setBusy] = useState<boolean>(false);

  const [inputEmail, setEmail] = useState<string>('');
  const [inputPassword, setinputPassword] = useState<string>('');
  const [toastMessage, setToastMessage] = useState('Logging in...');
  const [showToast1, setShowToast1] = useState(false);

  useEffect(() => {
  });

  async function login() {
    if (inputEmail.trim() === '' || inputPassword === '') {
      setToastMessage('Please fill in all fields.')
      setShowToast1(true)
      return
    }
    setBusy(true);
    const res: any = await loginUser(inputEmail, inputPassword)
    let message
    if (res instanceof Error) {
      message = res.message
      setToastMessage(res.message)
      setShowToast1(true)
      setBusy(false);
    }
    else {
      // console.log('this is apparently the msg', message.user._delegate.email)
      setToastMessage('Login Successful!')
      setShowToast1(true)
      dispatch(setUserState(res.user._delegate.email))
      setBusy(false);
      history.replace('/List')
    }


    // console.log(`${res.success ? 'login success' : 'login failed'}`)
  }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message={toastMessage}
          duration={4000}
        />
        <IonLoading message="Logging you in..." duration={0} isOpen={busy}></IonLoading>

        <div className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              placeholder="Email"
              type='email'
              value={inputEmail}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  // Cancel the default action, if needed
                  e.preventDefault();
                  // Trigger the button element with a click
                  login();
                }
              }}
              onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput className="ion-padding"
              placeholder="Password"
              type="password"
              value={inputPassword}
              onIonChange={(e: any) => setinputPassword(e.target.value)}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  // Cancel the default action, if needed
                  e.preventDefault();
                  // Trigger the button element with a click
                  login();
                }
              }}
            />
          </IonItem>

          {/* <IonItem lines="none">
            <IonLabel>Remember me</IonLabel>
            <IonCheckbox defaultChecked={true} slot="start" />
          </IonItem> */}

          <IonButton
            className="ion-margin-top"
            expand="block"
            onClick={login}
            color="secondary" >
            Login
          </IonButton>
          <p className='ion-text-center'>Don't have an account? <Link to="/Register">Register</Link></p>
        </div>

      </IonContent>
    </IonPage >
  );
};

export default Login;
