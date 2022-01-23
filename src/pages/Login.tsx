import { IonToast, IonItem, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { Link, Route } from 'react-router-dom';
import { lockOpen } from 'ionicons/icons';

import './Page.css';
import { useEffect, useState } from 'react';
import { loginUser } from '../firebaseFunctions';
import { toast } from '../toast';

const Login: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [busy, setBusy] = useState<boolean>(false);

  const [inputUser, setInput] = useState<string>('');
  const [inputPassword, setinputPassword] = useState<string>('');
  const [toastMessage, setToastMessage] = useState('Logging in...');
  const [showToast1, setShowToast1] = useState(false);

  async function login() {
    setBusy(true);
    const res = await loginUser(inputUser, inputPassword)
    if (!res) {
      // toast('Login failed, please try again')
      setToastMessage('Login failed, please try again')
      setShowToast1(true)
    } else {
      // toast('Login successful! ')
      setToastMessage('Login Successful!')
      setShowToast1(true)
      setBusy(false);
    }


    console.log(`${res ? 'login success' : 'login failed'}`)
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
          duration={2000}
        />
        <IonLoading message="Logging you in..." duration={0} isOpen={busy}></IonLoading>



        <IonInput
          placeholder="Username"
          value={inputUser}
          onIonChange={(e: any) => setInput(e.target.value)}>
        </IonInput>
        <IonInput
          placeholder="Password"
          type="password"
          value={inputPassword}
          onIonChange={(e: any) => setinputPassword(e.target.value)}>
        </IonInput>







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
