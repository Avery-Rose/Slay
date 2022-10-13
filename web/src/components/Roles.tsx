import React, { useEffect } from 'react';
import { app } from '../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const db = getFirestore(app);

const base10ToHex = (num: number) => {
  const hex = num.toString(16);
  const value = hex.length === 1 ? 'b9bbbe' : hex;
  return '#' + value;
};

const Dot = ({ color }: { color: string }) => {
  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: color,
      }}
    ></div>
  );
};

const Roles = () => {
  const [roles, setRoles] = React.useState([]);

  const getRoles = async () => {
    const rolesCollection = collection(db, 'roles');
    const rolesSnapshot = await getDocs(rolesCollection);
    const rolesList = rolesSnapshot.docs.map((doc) => doc.data());
    return rolesList;
  };

  const groupByGuild = roles.reduce((acc, role) => {
    const { guild } = role;
    if (!acc[guild]) {
      acc[guild] = [];
    }

    acc[guild].push(role);
    return acc;
  }, {});

  useEffect(() => {
    getRoles().then((roles) => setRoles(roles));
  }, []);

  useEffect(() => {
    console.log(groupByGuild);
  }, [roles]);

  return (
    <div>
      <h1>Roles</h1>
      {
        // refresh button
      }
      <button
        onClick={() => {
          getRoles().then((roles) => setRoles(roles));
        }}
      >
        Refresh
      </button>
      <div
        style={{
          listStyle: 'none',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: '#202020',
          borderRadius: '5px',
        }}
      >
        {Object.keys(groupByGuild).map((guild) => {
          return (
            <div
              key={guild}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                margin: '10px',
                color: 'white',
              }}
            >
              <h2>{guild}</h2>
              <ul
                style={{
                  listStyle: 'none',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {groupByGuild[guild].map((role) => {
                  return (
                    <li
                      key={role.id}
                      style={{
                        color: 'white',
                        backgroundColor: '#292b2f',
                        padding: '10px',
                        margin: '10px',
                        borderRadius: '5px',
                        width: 'fit-content',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <Dot color={base10ToHex(role.color)} />
                      {role.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roles;
