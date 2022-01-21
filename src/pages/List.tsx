import { IonItemSliding, IonButton, IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonItemOptions, IonItemOption, IonText, IonLabel, IonAvatar, IonIcon } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { trashBin } from 'ionicons/icons';
import './Page.css';

const List: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const DataArray = [
    {
      num: 1,
      name: "Junior",
      desc: "Elite Gamer",
      url: "WlxXA15.jpg"
    },
    {
      num: 2,
      name: "Clark",
      desc: "Fluffy",
      url: "TGK9EiR.png"
    },
    {
      num: 3,
      name: "Tora",
      desc: "Friendly",
      url: "nl4M3bo.jpg"
    },
    {
      num: 4,
      name: "Yuuki",
      desc: "Motivational",
      url: "i0mRkg2.jpg"
    }
  ]
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

        <IonList className="ion-padding">
          {DataArray.map(elem => (
            <IonItemSliding key={elem.num}>
              <IonItem>
                <IonAvatar>
                  <img src={`https://i.imgur.com/${elem.url}`} />
                </IonAvatar>

                <IonLabel className="ion-padding">
                  <h2>{elem.name}</h2>
                  <p>{elem.desc}</p>
                </IonLabel>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => alert("deleted")} ><IonIcon icon={trashBin}></IonIcon></IonItemOption>
              </IonItemOptions>

            </IonItemSliding>
          ))}

        </IonList>
        <IonButton routerLink='/Login'>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default List;
