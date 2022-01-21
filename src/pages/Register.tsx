import { IonItem, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { Link, Redirect, Route } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import { lockOpen } from 'ionicons/icons';

import './Page.css';
import { useEffect, useState } from 'react';

const Register: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [inputUser, setInput] = useState<string>('')
  const [inputPassword, setinputPassword] = useState<string>('')
  const [inputCPassword, setinputCPassword] = useState<string>('')

  // useEffect(() => {
  //   console.table(`username: ${inputUser} pass: ${inputPassword}`)
  // }, [inputUser, inputPassword])


  function registerUser() {
    console.table(`Registered! U: ${inputUser} P: ${inputPassword} cpass: ${inputCPassword}`)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Register</IonTitle>
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
        <IonInput
          placeholder="Confirm Password"
          type="password"
          value={inputCPassword}
          onIonChange={(e: any) => setinputCPassword(e.target.value)}>
        </IonInput>





        <IonButton expand="full" color="secondary" onClick={registerUser}>
          <IonIcon slot="end" icon={lockOpen}></IonIcon>
          Register
        </IonButton>

        <IonItem>
          <p>Already have an account? <Link to="/Login">Login</Link></p>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Register;
