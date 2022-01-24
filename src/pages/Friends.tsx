import { IonItemSliding, IonButton, IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonItemOptions, IonItemOption, IonLabel, IonAvatar, IonIcon, IonInput, IonToggle, IonRadio, IonCheckbox, IonRadioGroup, IonListHeader, IonItemDivider } from '@ionic/react';
import { useParams } from 'react-router';
import { trashBin } from 'ionicons/icons';
import './Page.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Friends: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const username = useSelector((state: any) => state.user.username)

  const DataArray = [
    {
      num: 1,
      name: `${username} (You)`,
      desc: "Friendly",
      url: "wpJCrSy.png"
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
    },
    {
      num: 5,
      name: "Junior",
      desc: "Elite Gamer",
      url: "WlxXA15.jpg"
    }
  ]


  function removeElement(e: any) {
    var killerID = e.currentTarget.parentNode.parentNode.id
    console.log('killerID: ', killerID)
    var el: any = document.getElementById(killerID);
    el.remove(); // Removes the div with the 'div-02' id
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Friends</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonListHeader>
          <h2>Try dragging</h2>
        </IonListHeader>
        <IonList className="ion-padding" inset={true}>
          {DataArray.map(elem => (
            <IonItemSliding key={elem.num} id={elem.num.toString()}>
              <IonItem>
                <IonAvatar>
                  <img alt="avatar" src={`https://i.imgur.com/${elem.url}`} />
                </IonAvatar>

                <IonLabel className="ion-padding">
                  <h2>{elem.name}</h2>
                  <p>{elem.desc}</p>
                </IonLabel>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={e => removeElement(e)} ><IonIcon icon={trashBin}></IonIcon></IonItemOption>
              </IonItemOptions>

            </IonItemSliding>
          ))}

        </IonList>
      </IonContent>
    </IonPage >
  );
};

export default Friends;
