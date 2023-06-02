```mermaid
sequenceDiagram
  Frontend->>+Server: 抽選依頼
  Server->>+OpenAI: 文言生成依頼
  OpenAI-->>-Server: レスポンス
  Server->>+Stable Diffusion: 画像生成依頼
  Stable Diffusion-->>-Server: レスポンス
  Server->>+CDN: 画像アップロード
  CDN-->>-Server: レスポンス
  Server->>+Smart contract: 抽選結果書込み
  Smart contract-->>-Server: レスポンス
  Server-->>-Frontend: レスポンス

  Frontend->>+Smart contract: ミント依頼
  Smart contract-->>-Frontend: レスポンス
```
