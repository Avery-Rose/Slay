import React, { useEffect } from 'react';
import { app } from '../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { motion } from "framer-motion"

const db = getFirestore(app);

const containerVariant = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
}

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const base10ToHex = (num: number) => {
  const hex = num.toString(16);
  const value = hex.length === 1 ? 'b9bbbe' : hex;
  return '#' + value;
};

const Dot = ({ color }: { color: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1}}
      whileTap={{
        scale: 0.9,
      }}
      style={{
        cursor: 'pointer',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: color,
      }}
      onClick={() => {
        // Copy to clipboard
        navigator.clipboard.writeText(color);
        console.log('Copied color to clipboard.');
      }}
    />
  );
};

const Roles = () => {
  const [roles, setRoles] = React.useState([]);

  const getRoles = async () => {
    const rolesCollection = collection(db, 'roles');
    const rolesSnapshot = await getDocs(rolesCollection);
    return rolesSnapshot.docs.map((doc) => doc.data());
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
              <motion.ul
                variants={containerVariant}
                initial="hidden"
                animate="visible"
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
                    <motion.li
                      key={role.id}
                      className="role"
                      variants={itemVariant}
                    >
                      <Dot color={base10ToHex(role.color)} />
                      <motion.span
                      whileTap={{y: 2}}
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        // Copy to clipboard
                        navigator.clipboard.writeText(role.name);
                        console.log('Copied role name to clipboard.');
                      }}>{role.name}</motion.span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roles;
