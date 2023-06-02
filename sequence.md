```mermaid
sequenceDiagram
  Frontend->>+Server: 抽選依頼
  Server-->>+Blockchain: 抽選結果書込み
  Blockchain-->>-Server: レスポンス
  Server-->>-Frontend: レスポンス

  Frontend-->>Blockchain: mint
```
