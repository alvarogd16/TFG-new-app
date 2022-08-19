const ChipIcon = ({ isFocus }) => {
    const stroke = isFocus ? "#fdd140" : "#fff"
    return <svg width="48px" height="48px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <title>
            24 Technology Devices icons
        </title>
        <rect x="9" y="9" width="30" height="30" rx="2" ry="2" fill="none" stroke={stroke} strokeMiterlimit="10" strokeWidth="2" />
        <rect x="18" y="18" width="12" height="12" rx="1" ry="1" fill="none" stroke={stroke} strokeMiterlimit="10" strokeWidth="2" />
        <line x1="16" y1="47" x2="16" y2="39.19" fill="none" stroke={stroke} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
        <line x1="24" y1="47" x2="24" y2="39.19" fill="none" stroke={stroke} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
        <line x1="32" y1="47" x2="32" y2="39.19" fill="none" stroke={stroke} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
        <line x1="16" y1="9" x2="16" y2="1" fill="none" stroke={stroke} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
        <line x1="24" y1="8.9" x2="24" y2="1" fill="none" stroke={stroke} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
        <line x1="32" y1="9" x2="32" y2="1" fill="none" stroke={stroke} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
        <line x1="47" y1="32" x2="39" y2="32" fill="none" stroke={stroke} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
        <line x1="47" y1="24" x2="39" y2="24" fill="none" stroke={stroke} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
        <line x1="47" y1="16" x2="39" y2="16" fill="none" stroke={stroke} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
        <line x1="9" y1="32" x2="1" y2="32" fill="none" stroke={stroke} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
        <line x1="8.87" y1="24" x2="1" y2="24" fill="none" stroke={stroke} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
        <line x1="9" y1="16" x2="1" y2="16" fill="none" stroke={stroke} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
        <rect width="48" height="48" fill="none" />
    </svg>
}

export default ChipIcon