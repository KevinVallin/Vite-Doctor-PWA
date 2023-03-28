import { Dialog } from '@headlessui/react';
import { DocumentData, Firestore, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { useFirestore } from '~/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

function Index() {
  const { state } = useAuthState();
  const firestore = useFirestore();
  const [isOpen, setIsOpen] = useState(true);
  const completeButtonRef = useRef(null);
  const [events , setEvents] = useState<[] | null>(null)

  useEffect(() => {
    if (state.state === 'SIGNED_IN'){
      console.log("test")
      getDocs(collection(firestore, 'event')).then((qs) => {
        const evts = []
        qs.forEach(res => evts.push(res.data()))
        setEvents(evts);
      })

    } 

  },[])

  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen">
            <div className="mt-4 grid gap-2">
              {state.state === 'UNKNOWN' ? null : state.state === 'SIGNED_OUT' ? <SignInButton /> : <SignOutButton />}
              {state.state === 'SIGNED_IN' && <p>{state.currentUser.uid}</p> }
              <button onClick={() => setIsOpen(true)}>Display Dialog</button>
            </div>
            {events && events.map(event => <p className='m-8' key={event.uid}>
              {JSON.stringify(event)}
            </p>) }
      </div>
    </>
  );
}

export default Index;
