/**
 * The video encoder configuration.
 *
 * This interface sets the video encoder configuration in [setVideoEncoderConfiguration](https://docs.agora.io/en/Voice/API%20Reference/web/interfaces/agorartc.stream.html#setvideoencoderconfiguration).
 *
 * Depending on the OS, browser, and camera, the actual resolution, frame rate, and bitrate might be different from the set values.
 */
export interface VideoEncoderConfiguration {
    /**
     * The video bitrate (Kbps). The value range is [1,10000000].
     *
     * We recommend setting the bitrate between 100 Kbps and 5000 Kbps. You can refer to the table below and set your bitrate.
     */
    bitrate: {
        max: number;
        min: number;
    };
    /**
     * The video frame rate (fps).
     *
     * The value range is [1, 10000]. We recommend setting the frame rate between 5 fps and 30 fps
     *
     * @remarks
     * This parameter sets the local capturing video frame rate. The actual encoding frame rate depends on the device, system, and browser.
     * When the network conditions change, the browser adjusts the encoding frame rate automatically.
     */
    frameRate: {
        max: number;
        min: number;
    }
    /**
     * Resolution of the video.
     *
     * We recommend using common resolutions, for example:
     * - 480 × 360
     * - 640 × 480
     * - 960 × 720
     */
    resolution: {
        height: number;
        width: number;
    };
}