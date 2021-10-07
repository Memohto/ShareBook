import book from "@/components/Book.vue";
import { mount } from "@vue/test-utils";

describe("Book.vue", () => {
  it("renders slots when passed", () => {
    let id1="01"
    const wrapper = mount(book, {
      props: {
        id: id1,
        image: "imagen",
        title:" String",
        author: "String",
        credits: 01,
        condition: "String",
        genre: "String",
        uploaded: 2,
        owner: "String",
        isMine: true,
      },
    });
    
    expect(wrapper.text().toMatch(id1));
    //expect(wrapper.html()).toMatch(content);
  });
});