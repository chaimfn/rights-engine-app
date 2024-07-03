
const _conf = window.config;
const Config = {
    backend: {
        hz: `${_conf.backendUrl}/hz`,
        ready: `${_conf.backendUrl}/ready`,
        data: `${_conf.backendUrl}/rights`,
    }
}
export default Config;