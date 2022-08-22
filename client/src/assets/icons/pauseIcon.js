const PauseIcon = ({ isFocus }) => {
    const fill = isFocus ? "#fdd140" : "#fff"
    return <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="24px" width="24px"
            viewBox="0 0 44 44" fill={fill}>
            <g>
                <path d="M15.5,0c-1.103,0-2,0.897-2,2v40c0,1.103,0.897,2,2,2s2-0.897,2-2V2C17.5,0.897,16.603,0,15.5,0z"/>
                <path d="M28.5,0c-1.103,0-2,0.897-2,2v40c0,1.103,0.897,2,2,2s2-0.897,2-2V2C30.5,0.897,29.603,0,28.5,0z"/>
            </g>
        </svg>
    }

export default PauseIcon