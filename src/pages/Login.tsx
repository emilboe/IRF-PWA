import { IonToast, IonItem, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading, IonList, IonLabel } from '@ionic/react';
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
    // Update the document title using the browser API
    document.title = ` ${inputEmail}`;
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
      <IonContent fullscreen className="ion-padding">
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


        <IonList>
          <IonItem>
            <IonInput
              placeholder="Email"
              type='email'
              value={inputEmail}
              onIonChange={(e: any) => setEmail(e.target.value)}>
            </IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="Password"
              type="password"
              value={inputPassword}
              onIonChange={(e: any) => setinputPassword(e.target.value)}>
            </IonInput>
          </IonItem>
        </IonList>





        <IonButton expand='full' color="secondary" onClick={login}>
          <IonIcon slot="end" icon={lockOpen}></IonIcon>
          Login
        </IonButton>

        <IonItem>
          <p>Don't have a user? <Link to="/Register">Register</Link></p>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Login;
