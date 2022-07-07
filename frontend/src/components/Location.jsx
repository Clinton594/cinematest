import Location from "./Icons/Location";

export default function CardComponent({ event }) {
  return (
    <div className="mb-4 MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-13nd69s">
      <div className="MuiCardContent-root css-eaqp2g">
        <div className="MuiBox-root css-70qvj9">
          <div
            className="MuiAvatar-root MuiAvatar-rounded MuiAvatar-colorDefault css-ck7gxn"
            skin="light"
            color="primary"
          >
            <Location />
          </div>
          <div className="MuiBox-root css-j7qwjs">
            <div className="MuiBox-root css-xxdqwu">
              <h6 className="MuiTypography-root MuiTypography-h6 css-p5l70t">{event.name}</h6>
            </div>
            {/* <span className="MuiTypography-root MuiTypography-caption css-rsvzto">{event.address}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
