/*
 * @Author: your name
 * @Date: 2022-02-04 12:07:29
 * @LastEditTime: 2022-02-04 12:09:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-react-app/src/components/test.js
 */
function Mailbox(props) {
    let unreadMessages = props.unreadMessages || [111];
    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        }
      </div>
    );
  }
  
  export default Mailbox