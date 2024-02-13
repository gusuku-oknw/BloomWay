// src/components/LectureDetail.js

import React from 'react';

class LectureDetail extends React.Component {
  render() {
    const { lecture } = this.props;

    return (
      <div className="lecture-detail">
        <h3>{lecture.title}</h3>
        <p>{lecture.description}</p>
        {/* その他の詳細情報をここに追加 */}
      </div>
    );
  }
}

export default LectureDetail;
