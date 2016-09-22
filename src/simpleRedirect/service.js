import redirectUrlFactory from './redirectUrlFactory';

export default {
    redirect(type, config, redirectMethod) {
        redirectMethod(redirectUrlFactory[type](config));
    }
};
