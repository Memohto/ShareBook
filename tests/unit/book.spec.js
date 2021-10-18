import Book from "@/components/Book.vue";
import { createLocalVue, mount  } from "@vue/test-utils";
import { BootstrapVue } from 'bootstrap-vue';
import firebase from 'firebase/app';
import { firestore, auth, changeDocData } from "@/mocks/firebase";
import flushPromises from 'flush-promises';

describe("Book.vue", () => {
  const localVue = createLocalVue();
  localVue.use(BootstrapVue);

  firebase.firestore = firestore;
  firebase.auth = auth;

  const $router = {
    push: jest.fn()
  }

  let wrapper;
  const bookInfo = {
    id: '123456789',
    image: 'ImageUrl',
    title: 'Libro perrón',
    author: 'Juan Pérez',
    credits: 100,
    condition: 'Casi nuevo',
    genre: 'Novela',
    uploaded: 1634517557,
    owner: 'guillermohiroshi@gmail.com',
    isMine: false,
  }
  beforeEach(async () => {
    wrapper = mount(Book, {
      localVue,
      mocks: {
        $router
      },
      propsData: {
        ...bookInfo
      },
    });
  })

  it("renders", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders slots when passed (isMine)", () => {
    const newBook = { ...bookInfo }
    newBook.isMine = true;
    wrapper = mount(Book, {
      localVue,
      propsData: {
        ...newBook
      },
    });
    expect(wrapper.text()).toMatch(bookInfo.genre);
    expect(wrapper.text()).toMatch(bookInfo.condition);
    expect(wrapper.text()).toMatch(bookInfo.credits.toString());
  });

  it("renders slots when passed (!isMine)", () => {
    expect(wrapper.text()).toMatch(bookInfo.owner);
    expect(wrapper.text()).toMatch(bookInfo.genre);
    expect(wrapper.text()).toMatch(bookInfo.condition);
    expect(wrapper.text()).toMatch(bookInfo.credits.toString());
    expect(wrapper.text()).toMatch('Solicitar libro');
  });

  it("requests with enough credits", async () => {
    changeDocData({ credits: 200 });
    wrapper.find('button').trigger('click');
    await flushPromises();
    expect($router.push).lastCalledWith('/solicitudes');
  });

  it("requests with not enough credits", async () => {
    changeDocData({ credits: 50 });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    wrapper.find('button').trigger('click');
    await flushPromises();
    expect(window.alert).toBeCalledWith('No hay créditos suficientes');
  })

});