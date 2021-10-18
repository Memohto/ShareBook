let docData = { data: "MOCK_DATA" };
const docResult = {
  data: () => docData
};
const get = jest.fn(() => Promise.resolve(docResult));
const set = jest.fn(() => Promise.resolve());
const doc = jest.fn(() => {
  return {
    set,
    get
  };
});
const collection = () => {
    return { doc };
  };
const firestore = () => {
  return { collection };
};
firestore.FieldValue = {
  serverTimestamp: () => {
    return "MOCK_TIME";
  }
};

const user = { currentUser: { email: 'user@test.com' } };
const auth = () => {
  return user;
}

function changeDocData(newDoc) {
  docData = newDoc;
}

export { firestore, auth, changeDocData };