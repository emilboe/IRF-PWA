import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonToggle,
} from '@ionic/react';

import { useHistory, useLocation } from 'react-router-dom';
import { moon, person, logIn, list, archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, logOut } from 'ionicons/icons';
import './Menu.css';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../firebaseFunctions'
import { setUserState } from '../redux/actions';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Inbox',
    url: '/page/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Outbox',
    url: '/page/Outbox',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Archived',
    url: '/page/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Trash',
    url: '/page/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Spam',
    url: '/page/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory()
  const dispatch = useDispatch()
  const username = useSelector((state: any) => state.user.username)


  const toggle: any = document.querySelector('#themeToggle');
  toggle.checked = true

  // Listen for the toggle check/uncheck to toggle the dark class on the <body>
  if (toggle != null) {
    toggle.addEventListener('ionChange', (ev: any) => {
      document.body.classList.toggle('dark', ev.detail.checked);
      // console.log('curdoc:', document.body.classList)
    });

  }

  // Called by the media query to check/uncheck the toggle
  function checkToggle(shouldCheck: any,) {
    if (toggle != null) {
      toggle.checked = shouldCheck;
    }
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>{username ? `Hey, ${username}!` : ''} </IonNote>
          {username ?
            <div>
              <IonItem className={location.pathname === '/Friends' ? 'selected' : ''} routerLink={'/Friends'} routerDirection="none" lines="full" detail={false} >
                <IonIcon slot="start" icon={person} />
                <IonLabel>Friends</IonLabel>
              </IonItem>
              <IonItem className={location.pathname === '/List' ? 'selected' : ''} routerLink={'/List'} routerDirection="none" lines="full" detail={false} >
                <IonIcon slot="start" icon={list} />
                <IonLabel>List</IonLabel>
              </IonItem>

            </div>
            :
            <IonItem className={location.pathname === '/Login' ? 'selected' : ''} routerLink={'/Login'} routerDirection="none" lines="full" detail={false}>
              <IonIcon slot="start" icon={logIn} />
              <IonLabel>Login</IonLabel>
            </IonItem>
          }

        </IonList>
        <IonList>
          {username ?
            <IonItem onClick={() => {
              logoutUser();
              dispatch(setUserState(''))
              history.replace('/Login')
            }}>
              <IonIcon slot="start" icon={logOut} />
              <IonLabel>Log out</IonLabel>
            </IonItem>
            : ''}

          <IonItem>
            <IonIcon slot="start" icon={moon}></IonIcon>
            <IonLabel>Dark Theme</IonLabel>
            <IonToggle id="themeToggle" slot="end"></IonToggle>
          </IonItem>
        </IonList>


        {/* {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })} */}

        {/* 
        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu >
  );
};

export default Menu;
