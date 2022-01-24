import { IonToast, IonItem, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import { useParams } from 'react-router';
import { useHistory, Link, Redirect, Route } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import { lockOpen } from 'ionicons/icons';
import { registerUser } from '../firebaseFunctions';
import './Page.css';
import { useEffect, useState } from 'react';

const Register: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  let history = useHistory();

  const [busy, setBusy] = useState<boolean>(false);
  const [inputEmail, setEmail] = useState<string>('')
  const [inputPassword, setinputPassword] = useState<string>('')
  const [inputCPassword, setinputCPassword] = useState<string>('')
  const [toastMessage, setToastMessage] = useState('Logging in...');
  const [showToast1, setShowToast1] = useState(false);

  async function register() {
    if (inputPassword !== inputCPassword) {
      setToastMessage('Passwords do not match.')
      setShowToast1(true)
      return
    }
    if (inputEmail.trim() === '' || inputPassword === '' || inputCPassword === '') {
      setToastMessage('Please fill in all fields.')
      setShowToast1(true)
      return
    }
    if (inputPassword.length < 6) {
      setToastMessage('Password must be at least 6 characters.')
      setShowToast1(true)
      return
    }
    const res = await registerUser(inputEmail, inputPassword)
    if (!res.success) {
      setToastMessage('Something went wrong...')
      setShowToast1(true)
      console.log(res.message)
      return
    } else{
      setToastMessage('Successfully registered!')
      setShowToast1(true)
      console.log(res)
      history.push('/Login')
    }
    console.log(res)


    // console.table(`Registered! U: ${inputEmail} P: ${inputPassword} cpass: ${inputCPassword}`)
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

        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message={toastMessage}
          duration={2000}
        />
        <IonLoading message="Creating your account..." duration={0} isOpen={busy}></IonLoading>



        <IonInput
          placeholder="Email"
          type="email"
          value={inputEmail}
          onIonChange={(e: any) => setEmail(e.target.value)}>
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





        <IonButton expand="full" color="secondary" onClick={register}>
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
