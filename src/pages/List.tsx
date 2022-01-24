import { IonItemSliding, IonButton, IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonItemOptions, IonItemOption, IonLabel, IonAvatar, IonIcon, IonInput, IonToggle, IonRadio, IonCheckbox, IonRadioGroup, IonListHeader, IonItemDivider } from '@ionic/react';
import { useParams } from 'react-router';
import { trashBin } from 'ionicons/icons';
import './Page.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const List: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const username = useSelector((state: any) => state.user.username)
  const [selected, setSelected] = useState<string>('Pikachu');


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList inset={true}>
          <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>

            <IonListHeader>
              <h2>Who's your favorite pokemon?</h2>
            </IonListHeader>

            <IonItem>
              <IonLabel>Pikachu</IonLabel>
              <IonRadio slot="end" value="Pikachu" />
            </IonItem>

            <IonItem>
              <IonLabel>Vulpix</IonLabel>
              <IonRadio slot="end" value="Vulpix" />
            </IonItem>

            <IonItem>
              <IonLabel>Mew</IonLabel>
              <IonRadio slot="end" value="Mew" />
            </IonItem>
          </IonRadioGroup>

          <IonItemDivider>Your Selection</IonItemDivider>
          <IonItem>{selected ?? '(none selected'}</IonItem>

          <IonItemDivider>Checkbox list</IonItemDivider>
          <IonItem>
            <IonLabel>Carrots</IonLabel>
            <IonCheckbox slot="start" />
          </IonItem>
          <IonItem>
            <IonLabel>Olives</IonLabel>
            <IonCheckbox slot="start" />
          </IonItem>
          <IonItem>
            <IonLabel>Taters</IonLabel>
            <IonCheckbox slot="start" />
          </IonItem>

          <IonItemDivider>Other</IonItemDivider>
          <IonItem>
            <IonInput placeholder="Text input..." className="ion-text-center"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Toggle</IonLabel>
            <IonToggle slot="end"></IonToggle>
          </IonItem>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default List;
