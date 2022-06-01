import React from "react";
import Video from "./Icons/Video";

export default function MovieCard() {
  return (
    <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-13nd69s">
      <div class="MuiCardContent-root css-sqbnmk">
        <div class="MuiBox-root css-7vj6hg">
          <div class="MuiAvatar-root MuiAvatar-rounded MuiAvatar-colorDefault css-1y8n9xn" skin="light" color="primary">
            <Video></Video>
          </div>
          <div class="MuiBox-root css-70qvj9">
            <h6 class="MuiTypography-root MuiTypography-subtitle2 css-1pe3ekn">The Lord of the Rings</h6>
          </div>
        </div>
        <h6 class="MuiTypography-root MuiTypography-h6 css-89jxd8">Eddie Murphy</h6>
        <p class="MuiTypography-root MuiTypography-body2 css-nj6kt7">English, Spanish</p>
        <div
          class="MuiChip-root MuiChip-filled MuiChip-sizeSmall MuiChip-colorSecondary MuiChip-filledSecondary MuiChip-light css-ukumo5"
          skin="light"
        >
          <span class="MuiChip-label MuiChip-labelSmall css-tavflp">Action</span>
        </div>
      </div>
    </div>
  );
}
