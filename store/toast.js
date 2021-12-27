export const state = () => ({
    text: "",
    variant: "",
    img: ""
});

export const mutations = {
    setToastText: (state, payload) => {
        state.text = payload;
    },
    setToastVariant: (state, payload) => {
        state.variant = payload;
    },
    setToastImg: (state, payload) => {
        state.img = payload;
    }

};

export const getters = {
    getToastText: state => {
        return state.text;
    },
    getToastVariant: state => {
        return state.variant;
    },
    getToastImg: state => {
        return state.img;
    }
};