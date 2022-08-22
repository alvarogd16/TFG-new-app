import { useEffect, useState } from "react";
import PlayIcon from "../../assets/icons/playIcon";
import PauseIcon from "../../assets/icons/pauseIcon";

const DoubleButton = ({ data, isActive = true }) => {
    const [state, setState] = useState(true);

    let Icon_1 = data?.icon_1 ? data.icon_1 : undefined;
    let Icon_2 = data?.icon_2 ? data.icon_2 : undefined;

    const onClick = () => {
        state ? data.action_1() : data.action_2();
        setState(!state);
    };

    const className = state ?
        (data?.className_1 ? data.className_1 : 'default-button') :
        (data?.className_2 ? data.className_2 : 'default-button')

    return (
        <button disabled={!isActive} onClick={onClick} className={className}>
            {data?.text_1 && data?.text_2 && state ? data.text_1 : data.text_2}
            {Icon_1 && state && <Icon_1></Icon_1>}
            {Icon_2 && !state && <Icon_2></Icon_2>}
        </button>
    );
};

const SimpleButton = ({ data, isActive = true }) => {
    return (
        <button
            disabled={!isActive}
            onClick={data.action}
            className={data?.className ? data.className : "default-button"}
        >
            {data.icon}
        </button>
    );
};

const ControlButtons = ({ data, state, setState}) => {

    const subState = state.state

    useEffect(() => setState({ state: 'halt' }) ,[])
    const playStopData = {
        action_1: () => {
            console.log("init");
            setState({ state: 'init' })
        },
        action_2: () => {
            console.log("finish");
            setState({ state: 'finish' })
        },
        className_1: 'sim-init',
        className_2: 'sim-init',
        text_1: "init",
        text_2: "finish"
    };

    const runPauseData = {
        action_1: () => {
            console.log("run");
            setState({ state: 'run' })
        },
        action_2: () => {
            console.log("pause");
            setState({ state: 'pause' })
        },
        className_1: 'sim-button',
        className_2: 'sim-button',
        icon_1: PlayIcon,
        icon_2: PauseIcon
    };

    const tickData = {
        action: () => {
            console.log("tick");
            setState({ state: 'tick' })
        },
        className: 'sim-button',
        icon: "tick"
    };

    return (
        <div className='top-menu top-menu-sim'>
            <DoubleButton data={playStopData} isActive={subState !== 'finish'}/>
            <DoubleButton data={runPauseData} isActive={subState === 'ready' || subState === 'run'} />
            <SimpleButton data={tickData} isActive={subState === 'ready'} />
        </div>
    );
};

export default ControlButtons