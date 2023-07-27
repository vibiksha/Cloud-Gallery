export const BASE_ROUTE = "http://Img-gallery-alb-1833405999.us-east-1.elb.amazonaws.com:3000";

export const BACKEND_ROUTES = {
  SIGNUP: BASE_ROUTE + "/auth/signup",

  LOGIN: BASE_ROUTE + "/auth/login",

  UPLOAD: BASE_ROUTE + "/upload",

  DISPLAY: BASE_ROUTE + "/display",

  DELETE: BASE_ROUTE + "/delete",

  DOWNLOAD: BASE_ROUTE + "/download",
};

export const ROUTES={
  DASHBOARD:"dashboard",
  SIGNUP:"auth/signup",
  LOGIN:"auth/login"
}
