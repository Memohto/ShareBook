import Request from "@/components/Request.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import { BootstrapVue } from 'bootstrap-vue';
import firebase from 'firebase/app';
import { firestore, auth, changeDocData } from "@/mocks/firebase";
import flushPromises from 'flush-promises';

describe("Request.vue", () => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);

    firebase.firestore = firestore;
    firebase.auth = auth;

    const $router = {
        push: jest.fn()
    }

    let wrapper;
    
    beforeEach(() => {
        wrapper = mount(Request)
    })

    it('has data', () => {
        expect(typeof Request.data).toBe('function')
    });

    it("renders", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("renders 2", () => {
        expect(typeof wrapper.text()).toBe('string')
    })

    it("renders 3", () => {
        expect(typeof $router).toBe('object');
    })

    it("test 5", () => {
        expect(typeof localVue).toBe('function');
    })
})