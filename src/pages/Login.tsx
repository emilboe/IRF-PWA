import { IonItem, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { Link, Route } from 'react-router-dom';
import { lockOpen } from 'ionicons/icons';

import './Page.css';
import { useEffect, useState } from 'react';

const Login: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [inputUser, setInput] = useState<string>('')
  const [inputPassword, setinputPassword] = useState<string>('')

  // useEffect(() => {
  //   console.table(`username: ${inputUser} pass: ${inputPassword}`)
  // }, [inputUser, inputPassword])


  function loginUser() {
    console.table(`username: ${inputUser} pass: ${inputPassword} `)
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







        <IonButton expand='full' color="secondary" onClick={loginUser}>
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
