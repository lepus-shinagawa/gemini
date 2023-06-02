```mermaid
sequenceDiagram
  Frontend->>+Server: 抽選依頼
  Server->>+ChatGPT: 文言生成依頼
  ChatGPT-->>-Server: レスポンス
  Server->>Server: 画像生成（処理スピードによっては非同期でやる必要あるかも）
  Server->>+CDN: 画像アップロード
  CDN-->>-Server: レスポンス
  Server->>+Blockchain: 抽選結果書込み
  Blockchain-->>-Server: レスポンス
  Server-->>-Frontend: レスポンス

  Frontend->>Blockchain: mint
```
