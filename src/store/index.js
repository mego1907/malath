import { combineReducers } from "redux";
import { sections , blogsHome , blogsHomeSingle } from "./Website/reducers/home/index";
import { logedIn } from "./Admin/reducers/login/index";
import { users , user , userDelete , userUpdate , userCreate} from "./Admin/reducers/users/index";
import { sessions} from "./Admin/reducers/sessions/index";
import { wallet ,transactions , walletWithdraw , walletUsers  ,walletUsersAll} from "./Admin/reducers/wallet/index";
import { notifications , notificationDelete ,notificationUsers ,notificationSend , notificationSendSpecific} from "./Admin/reducers/notifications/index";
import { socialMedia , socialMediaDelete , SocialMediaStore , oneSocialMedia } from "./Admin/reducers/socialMedia/index";
import { countries , fields , createFields , subFields , nationality , languages} from "./Admin/reducers/constants/index";
import { blogs , blogStore , blogSingle , blogEdit , blogDelete} from "./Admin/reducers/blogs/index";
import { faq , faqStore , faqSingle , faqEdit , faqDelete} from "./Admin/reducers/faq/index";
import { page , pageUpdate } from "./Admin/reducers/page/index";
import { ageChart , userChart , sesstionChart ,  activityChart , profitChart} from "./Admin/reducers/dashboard/index";
import { usersActivations , activateUserActivationAll  , activateActivationUser , userActivationDeleteAll , userActivationDelete , getOneUserActivation} from "./Admin/reducers/userActivation/index";
import { messages ,  messagesSingle} from "./Admin/reducers/messages";
import { comments } from "./Admin/reducers/comments";
import { usersActivity , userActivity } from "./Admin/reducers/UsersActivity";
import { sessionPrice , sessionPricePost } from "./Admin/reducers/sessionPrice";
import { coupon , couponCreate, coupons, couponUpdate, couponDelete } from "./Admin/reducers/discountCoupon";
import { cancellaionfee , cancellaionfeePost , cancellaionfeeDelete } from "./Admin/reducers/cancellaionfee";
import { lectureCreate, lecture, lectures, lectureUpdate, lectureOrderUpdate, lectureDelete, advisers } from "./Admin/reducers/lectures";

export default combineReducers({
  sections,
  blogsHome,
  blogsHomeSingle,
  logedIn,
  users,
  user,
  userUpdate,
  userDelete,
  countries,
  fields,
  createFields,
  blogs,
  blogStore,
  blogSingle,
  blogEdit,
  blogDelete,
  faq,
  faqStore,
  faqSingle,
  faqEdit,
  faqDelete,
  page,
  pageUpdate,
  sessions,
  wallet,
  walletWithdraw,
  transactions,
  notifications,
  notificationDelete,
  notificationUsers,
  notificationSend,
  notificationSendSpecific,
  socialMedia,
  socialMediaDelete,
  oneSocialMedia,
  SocialMediaStore,
  userCreate,
  userChart,
  ageChart,
  sesstionChart,
  activityChart,
  profitChart,
  usersActivations,
  activateUserActivationAll,
  activateActivationUser,
  userActivationDeleteAll ,
  userActivationDelete,
  getOneUserActivation,
  messages,
  messagesSingle,
  subFields,
  comments,
  nationality,
  languages,
  walletUsers,
  usersActivity,
  userActivity,
  sessionPrice,
  sessionPricePost,
  coupon,
  couponCreate,
  coupons,
  couponUpdate,
  couponDelete,
  cancellaionfee,
  cancellaionfeePost,
  cancellaionfeeDelete,
  walletUsersAll,
  lecture,
  lectures,
  lectureCreate,
  lectureUpdate,
  lectureDelete,
  lectureOrderUpdate,
  advisers,
});
